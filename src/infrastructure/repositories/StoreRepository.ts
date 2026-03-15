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
import { IStoreRepository } from '@/domain/repositories/IStoreRepository'
import { Store } from '@/domain/models/Store'
import { StoreName } from '@/domain/valueObjects/StoreName'
import { StoreId, UserId } from '@/types'

export class StoreRepository implements IStoreRepository {
  private readonly collectionName = 'stores'

  async findById(id: StoreId): Promise<Store | null> {
    const docRef = doc(db, this.collectionName, id)
    const snapshot = await getDoc(docRef)

    if (!snapshot.exists()) {
      return null
    }

    return this.fromFirestore(snapshot)
  }

  async findAll(userId: UserId): Promise<Store[]> {
    const q = query(
      collection(db, this.collectionName),
      where('userId', '==', userId),
      orderBy('name', 'asc')
    )
    const snapshot = await getDocs(q)

    return snapshot.docs.map((doc) => this.fromFirestore(doc))
  }

  async save(store: Store): Promise<void> {
    const docRef = doc(db, this.collectionName, store.storeId)
    const data = this.toFirestore(store)
    await setDoc(docRef, data, { merge: true })
  }

  async delete(id: StoreId): Promise<void> {
    const docRef = doc(db, this.collectionName, id)
    await deleteDoc(docRef)
  }

  private toFirestore(store: Store): DocumentData {
    return {
      name: store.name.getValue(),
      location: store.location,
      memo: store.memo,
      userId: store.userId,
      createdAt: Timestamp.fromDate(store.createdAt),
      updatedAt: Timestamp.fromDate(store.updatedAt),
    }
  }

  private fromFirestore(snapshot: DocumentSnapshot): Store {
    const data = snapshot.data()!

    return Store.restore({
      storeId: snapshot.id as StoreId,
      name: StoreName.create(data.name),
      location: data.location || null,
      memo: data.memo || null,
      userId: data.userId as UserId,
      createdAt: data.createdAt.toDate(),
      updatedAt: data.updatedAt.toDate(),
    })
  }
}
