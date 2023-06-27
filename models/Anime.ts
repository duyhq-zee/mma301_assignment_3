class Anime {
	id: string;
	name: string;
	imageUrl: string;
	description?: string;

	constructor(id: string, name: string, imageUrl: string) {
		this.id = id;
		this.name = name;
		this.imageUrl = imageUrl;
	}
}

export default Anime;
