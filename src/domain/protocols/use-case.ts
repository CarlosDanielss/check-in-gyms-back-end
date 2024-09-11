export interface UseCase<Q, K> {
  execute(data: Q): Promise<K>;
}
