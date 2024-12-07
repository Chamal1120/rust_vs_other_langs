from time import perf_counter


def sum_of_squares(n):
    return sum(x * x for x in range(1, n + 1))


n = 1_000_000_000

start = perf_counter()
result = sum_of_squares(n)
elapsed = perf_counter() - start

print(f"Sum of squares from 1 to {n} = {result}")
print(f"Time taken: {elapsed:.6f} seconds")
