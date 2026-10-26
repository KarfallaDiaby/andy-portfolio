/** Vrai si la valeur est une vraie information, pas un texte d'attente entre crochets. */
export function isFilled(value: string | undefined | null): value is string {
  return Boolean(value) && !value!.trim().startsWith("[");
}
