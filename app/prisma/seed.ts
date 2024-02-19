import { Logger } from '@nestjs/common'
import { PrismaClient, RandomObject, RandomObjectEnum } from '@prisma/client'

const prisma = new PrismaClient()

const randomObjectMockData: Omit<RandomObject, 'id'>[] = [
  {
    stringValue: 'Example String 1',
    intValue: 42,
    floatValue: 3.14,
    booleanValue: true,
    dateTimeValue: new Date(),
    jsonValue: { key: 'value' },
    enumValue: RandomObjectEnum.KAPPA,
  },
  {
    stringValue: 'Example String 2',
    intValue: 123,
    floatValue: 2.718,
    booleanValue: false,
    dateTimeValue: new Date(),
    jsonValue: { anotherKey: 'anotherValue' },
    enumValue: RandomObjectEnum.KEEPO,
  },
]

async function insertMockedData() {
  await Promise.all(
    randomObjectMockData.map((mockData) => {
      return prisma.randomObject.create({ data: mockData })
    })
  )
}

async function main() {
  insertMockedData().then(async () => {
    await prisma.$disconnect()
  }).catch(async (e) => {
    Logger.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
}

main()
