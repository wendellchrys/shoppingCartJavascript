function getNormalize({ promotions }) {
    return promotions?.map((item) => {
        return { ...item };
    })
    .flat(Infinity);
}