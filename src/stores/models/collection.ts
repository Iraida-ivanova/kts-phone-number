export type CollectionModel<K extends string | number, T> = {
  keys: K[];
  entities: Record<K, T>;
};
