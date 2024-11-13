export enum AnimalType {
  Dog = 1,
  Cat = 2,
}

// Não precisa dessa label
// exemplo de uso: AnimalType[Dog as keyof typeof AnimalType]
// resultado: "Cachorro"

// export const AnimalTypeEnumLabel = {
//   [AnimalTypeEnum.Dog]: "Cachorro",
//   [AnimalTypeEnum.Cat]: "Gato",
// };
