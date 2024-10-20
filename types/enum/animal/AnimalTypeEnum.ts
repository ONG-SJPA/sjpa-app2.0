export enum AnimalType {
  Dog = "Cachorro",
  Cat = "Gato",
}

// Não precisa dessa label 
// exemplo de uso: AnimalType[Dog as keyof typeof AnimalType] 
// resultado: "Cachorro"
 
// export const AnimalTypeEnumLabel = {
//   [AnimalTypeEnum.Dog]: "Cachorro",
//   [AnimalTypeEnum.Cat]: "Gato",
// };
