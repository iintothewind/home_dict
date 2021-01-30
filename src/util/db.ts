import 'reflect-metadata'
import { createConnection, Connection, getConnectionManager } from 'typeorm'
import { Word, Usage } from '../entity'

const connectDb = async (): Promise<Connection> => {
  if (getConnectionManager().has('default')) {
    return getConnectionManager().get('default')
  } else {
    return createConnection()
  }
}

const fuzzySearch = async (sw: string): Promise<Word[]> => {
  const connection = await connectDb()
  return connection.getRepository(Word).find({ sw: sw })
}

const findWord = async (word: string): Promise<Word> => {
  const connection = await connectDb()
  return connection.getRepository(Word).findOne({ word: word })
}

const findUsage = async (userName: string, word: string): Promise<Usage> => {
  const connection = await connectDb()
  return connection.getRepository(Usage).findOne({ userName: userName, word: word })
}

const updateUsage = async (userName: string, word: string): Promise<Usage> => {
  const connection = await connectDb()
  const repository = connection.getRepository(Usage)
  const usage = await findUsage(userName, word)
  if (usage) {
    usage.frequency = usage.frequency + 1
    return repository.save(usage)
  } else {
    return repository.save({ userName: userName, word: word, frequency: 1 } as Usage)
  }
}

const listUsage = async (userName: string): Promise<Usage[]> => {
  const connection = await connectDb()
  return connection
    .getRepository(Usage)
    .createQueryBuilder('usage')
    .where('usage.user_name = :userName', { userName: userName })
    .orderBy('usage.frq', 'DESC')
    .limit(100)
    .getMany()
}

const lookup = async (userName: string, word: string): Promise<Word> => {
  const entry: Word = await findWord(word)
  if (entry) {
    await updateUsage(userName, word)
    return entry
  }
}

export { findWord, fuzzySearch, lookup, listUsage }

