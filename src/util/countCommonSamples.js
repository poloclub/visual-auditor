function countCommonSamples(samples, slice1, slice2) {
  let arr1 = samples[slice1];
  let arr2 = samples[slice2];
  if (!arr1 || !arr2) return 0;
  arr1 = arr1.sort((a, b) => 0.5 - Math.random()).slice(0, 2000);
  return arr1.filter((sample) => arr2.includes(sample)).length;
}
