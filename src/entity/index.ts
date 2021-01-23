import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity({ name: 'stardict' })
class Word {
  @PrimaryGeneratedColumn({ name: 'id', type: 'integer' })
  id: number

  @Column({ name: 'word', type: 'varchar' })
  word: string

  @Column({ name: 'sw', type: 'varchar' })
  sw: string

  @Column({ name: 'phonetic', type: 'varchar', nullable: true })
  phonetic: string

  @Column({ name: 'definition', type: 'text', nullable: true })
  definition: string

  @Column({ name: 'translation', type: 'text', nullable: true })
  translation: string

  @Column({ name: 'pos', type: 'varchar', nullable: true })
  pos: string

  @Column({ name: 'collins', type: 'integer', default: 0, nullable: true })
  collins: number

  @Column({ name: 'oxford', type: 'integer', default: 0, nullable: true })
  oxford: number

  @Column({ name: 'tag', type: 'varchar', nullable: true })
  tag: string

  @Column({ name: 'bnc', type: 'integer', default: 0, nullable: true })
  bnc: number

  @Column({ name: 'frq', type: 'integer', default: 0, nullable: true })
  frq: number

  @Column({ name: 'exchange', type: 'text', nullable: true })
  exchange: string
}


@Entity({ name: 'usage' })
class Usage {
  @PrimaryGeneratedColumn({ name: 'id', type: 'integer' })
  id: number

  @Column({ name: 'user_name', type: 'varchar' })
  userName: string

  @Column({ name: 'word', type: 'varchar' })
  word: string

  @Column({ name: 'frq', type: 'integer', default: 0 })
  frequency: number
}

export { Word, Usage }