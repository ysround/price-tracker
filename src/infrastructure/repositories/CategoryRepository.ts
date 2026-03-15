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
import { ICategoryRepository } from '@/domain/repositories/ICategoryRepository'
import { Category } from '@/domain/models/Category'
import { CategoryName } from '@/domain/valueObjects/CategoryName'
import { CategoryId, UserId } from '@/types'

export class CategoryRepository implements ICategoryRepository {
  private readonly collectionName = 'categories'

  async findById(id: CategoryId): Promise<Category | null> {
    const docRef = doc(db, this.collectionName, id)
    const snapshot = await getDoc(docRef)

    if (!snapshot.exists()) {
      return null
    }

    return this.fromFirestore(snapshot)
  }

  async findAll(userId: UserId): Promise<Category[]> {
    const q = query(
      collection(db, this.collectionName),
      where('userId', '==', userId),
      orderBy('displayOrder', 'asc')
    )
    const snapshot = await getDocs(q)

    return snapshot.docs.map((doc) => this.fromFirestore(doc))
  }

  async findChildren(
    parentId: CategoryId,
    userId: UserId
  ): Promise<Category[]> {
    const q = query(
      collection(db, this.collectionName),
      where('parentCategoryId', '==', parentId),
      where('userId', '==', userId),
      orderBy('displayOrder', 'asc')
    )
    const snapshot = await getDocs(q)

    return snapshot.docs.map((doc) => this.fromFirestore(doc))
  }

  async save(category: Category): Promise<void> {
    const docRef = doc(db, this.collectionName, category.categoryId)
    const data = this.toFirestore(category)
    await setDoc(docRef, data, { merge: true })
  }

  async delete(id: CategoryId): Promise<void> {
    const docRef = doc(db, this.collectionName, id)
    await deleteDoc(docRef)
  }

  private toFirestore(category: Category): DocumentData {
    return {
      name: category.name.getValue(),
      parentCategoryId: category.parentCategoryId,
      displayOrder: category.displayOrder,
      userId: category.userId,
      createdAt: Timestamp.fromDate(category.createdAt),
      updatedAt: Timestamp.fromDate(category.updatedAt),
    }
  }

  private fromFirestore(snapshot: DocumentSnapshot): Category {
    const data = snapshot.data()!

    return Category.restore({
      categoryId: snapshot.id as CategoryId,
      name: CategoryName.create(data.name),
      parentCategoryId: data.parentCategoryId as CategoryId | null,
      displayOrder: data.displayOrder,
      userId: data.userId as UserId,
      createdAt: data.createdAt.toDate(),
      updatedAt: data.updatedAt.toDate(),
    })
  }
}
