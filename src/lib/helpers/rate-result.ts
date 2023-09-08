export default function rateResult(rate: number) {
	const ratingResult = [];

	for (let i = 0; i < 5; i++) {
		if (rate > i) {
			if (rate > i + 0.5) {
				ratingResult.push('fill');
			} else {
				ratingResult.push('outline');
			}
		} else {
			ratingResult.push('off');
		}
	}
  
	return ratingResult;
}
