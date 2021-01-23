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

const findWord = async (word: string) => {
  const connection = await connectDb()
  return connection.getRepository(Word).findOne({ word: word })
}

const findUsage = async (userName: string, word: string) => {
  const connection = await connectDb()
  return connection.getRepository(Usage).findOne({ userName: userName, word: word })
}

const updateUsage = async (userName: string, word: string) => {
  const connection = await connectDb()
  const repository = connection.getRepository(Usage)
  const usage = await findUsage(userName, word)
  if (usage) {
    usage.frequency = usage.frequency + 1
    repository.save(usage)
  } else {
    repository.save({ userName: userName, word: word, frequency: 1 } as Usage)
  }
}

const lookup = async (userName: string, word: string) => {
  const entry: Word = await findWord(word)
  if (entry) {
    await updateUsage(userName, word)
    return entry
  }
}

export { findWord, lookup }

