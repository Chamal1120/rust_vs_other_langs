use rayon::prelude::*;
use std::time::Instant;

fn main() {
    let n: u64 = 1_000_000_000;

    let start = Instant::now();
    let sum: u64 = (1..=n).into_par_iter().map(|x| x * x).sum();
    let duration = start.elapsed();

    println!("Sum of squares from 1 to {} = {}", n, sum);
    println!("Time taken: {:?}", duration);
}
