export class Article {
    public title: string;
    public content: string;
    public author: string;

    constructor() { }

    from(data: Article) {
        this.title = data.title;
        this.content = data.content;
        this.author = data.author;
        return this;
    }

    static from(data: Article) {
        const _this = new Article();
        _this.from(data);
        return _this;
    }
}
