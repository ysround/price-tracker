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
  DocumentData,
  DocumentSnapshot,
  Timestamp,
} from 'firebase/firestore'
import { db } from '../firebase/config'
import { IProductRepository } from '@/domain/repositories/IProductRepository'
import { Product } from '@/domain/models/Product'
import { ProductName } from '@/domain/valueObjects/ProductName'
import { ProductId, CategoryId, UserId } from '@/types'

export class ProductRepository implements IProductRepository {
  private readonly collectionName = 'products'

  async findById(id: ProductId): Promise<Product | null> {
    const docRef = doc(db, this.collectionName, id)
    const snapshot = await getDoc(docRef)

    if (!snapshot.exists()) {
      return null
    }

    return this.fromFirestore(snapshot)
  }

  async findByCategoryId(
    categoryId: CategoryId,
    userId: UserId
  ): Promise<Product[]> {
    const q = query(
      collection(db, this.collectionName),
      where('categoryId', '==', categoryId),
      where('userId', '==', userId),
      orderBy('name', 'asc')
    )
    const snapshot = await getDocs(q)

    return snapshot.docs.map((doc) => this.fromFirestore(doc))
  }

  async findAll(userId: UserId): Promise<Product[]> {
    const q = query(
      collection(db, this.collectionName),
      where('userId', '==', userId),
      orderBy('name', 'asc')
    )
    const snapshot = await getDocs(q)

    return snapshot.docs.map((doc) => this.fromFirestore(doc))
  }

  async save(product: Product): Promise<void> {
    const docRef = doc(db, this.collectionName, product.productId)
    const data = this.toFirestore(product)
    await setDoc(docRef, data, { merge: true })
  }

  async delete(id: ProductId): Promise<void> {
    const docRef = doc(db, this.collectionName, id)
    await deleteDoc(docRef)
  }

  private toFirestore(product: Product): DocumentData {
    return {
      name: product.name.getValue(),
      categoryId: product.categoryId,
      photoURL: product.photoURL,
      memo: product.memo,
      userId: product.userId,
      createdAt: Timestamp.fromDate(product.createdAt),
      updatedAt: Timestamp.fromDate(product.updatedAt),
    }
  }

  private fromFirestore(snapshot: DocumentSnapshot): Product {
    const data = snapshot.data()!

    return Product.restore({
      productId: snapshot.id as ProductId,
      name: ProductName.create(data.name),
      categoryId: data.categoryId as CategoryId,
      photoURL: data.photoURL || null,
      memo: data.memo || null,
      userId: data.userId as UserId,
      createdAt: data.createdAt.toDate(),
      updatedAt: data.updatedAt.toDate(),
    })
  }
}
