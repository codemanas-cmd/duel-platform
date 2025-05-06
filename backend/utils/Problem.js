class Problem {
    constructor({contestId, index, tags, points, name, type }){
        this.id = `${contestId}-${index}`
        this.contestId = contestId;
        this.tags = tags;
        this.points = points;
        this.name = name;
        this.type = type;
        this.index = index;
        this.url = `https://codeforces.com/problemset/problem/${contestId}/${index}`
    }
}

export default Problem;