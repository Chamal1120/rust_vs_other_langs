#include <omp.h>
#include <stdio.h>

#define N 1000000000 // 1 billion

int main() {
  long long sum = 0;

// Start the parallel region with 4 threads
#pragma omp parallel for reduction(+ : sum) num_threads(4)
  for (long long i = 1; i <= N; i++) {
    sum += i * i;
  }

  printf("Sum of squares from 1 to %lld = %lld\n", N, sum);

  return 0;
}
