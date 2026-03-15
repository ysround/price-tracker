import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  DocumentData,
  DocumentSnapshot,
  Timestamp,
} from 'firebase/firestore'
import { db } from '../firebase/config'
import { IPriceRepository } from '@/domain/repositories/IPriceRepository'
import { Price } from '@/domain/models/Price'
import { Money } from '@/domain/valueObjects/Money'
import { PriceId, ProductId, StoreId, UserId } from '@/types'

export class PriceRepository implements IPriceRepository {
  private readonly collectionName = 'prices'

  async findById(id: PriceId): Promise<Price | null> {
    const docRef = doc(db, this.collectionName, id)
    const snapshot = await getDoc(docRef)

    if (!snapshot.exists()) {
      return null
    }

    return this.fromFirestore(snapshot)
  }

  async findByProductId(productId: ProductId, userId: UserId): Promise<Price[]> {
    const q = query(
      collection(db, this.collectionName),
      where('productId', '==', productId),
      where('userId', '==', userId),
      orderBy('recordedAt', 'desc')
    )
    const snapshot = await getDocs(q)

    return snapshot.docs.map((doc) => this.fromFirestore(doc))
  }

  async findByProductAndStore(
    productId: ProductId,
    storeId: StoreId,
    userId: UserId
  ): Promise<Price | null> {
    const q = query(
      collection(db, this.collectionName),
      where('productId', '==', productId),
      where('storeId', '==', storeId),
      where('userId', '==', userId),
      orderBy('recordedAt', 'desc'),
      limit(1)
    )
    const snapshot = await getDocs(q)

    if (snapshot.empty) {
      return null
    }

    return this.fromFirestore(snapshot.docs[0])
  }

  async save(price: Price): Promise<void> {
    const docRef = doc(db, this.collectionName, price.priceId)
    const data = this.toFirestore(price)
    await setDoc(docRef, data, { merge: true })
  }

  async delete(id: PriceId): Promise<void> {
    const docRef = doc(db, this.collectionName, id)
    await deleteDoc(docRef)
  }

  private toFirestore(price: Price): DocumentData {
    return {
      productId: price.productId,
      storeId: price.storeId,
      price: price.money.getAmount(),
      currency: price.money.getCurrency(),
      recordedAt: Timestamp.fromDate(price.recordedAt),
      userId: price.userId,
      createdAt: Timestamp.fromDate(price.createdAt),
      updatedAt: Timestamp.fromDate(price.updatedAt),
    }
  }

  private fromFirestore(snapshot: DocumentSnapshot): Price {
    const data = snapshot.data()!

    return Price.restore({
      priceId: snapshot.id as PriceId,
      productId: data.productId as ProductId,
      storeId: data.storeId as StoreId,
      money: Money.create(data.price, data.currency || 'JPY'),
      recordedAt: data.recordedAt.toDate(),
      userId: data.userId as UserId,
      createdAt: data.createdAt.toDate(),
      updatedAt: data.updatedAt.toDate(),
    })
  }
}
