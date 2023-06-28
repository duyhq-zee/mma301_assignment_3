class Anime {
	id: string;
	name: string;
	imageUrl: string;
	description?: string;
	category: string;

	constructor(
		id: string,
		name: string,
		imageUrl: string,
		description: string,
		category: string
	) {
		this.id = id;
		this.name = name;
		this.imageUrl = imageUrl;
		this.description = description;
		this.category = category;
	}
}

export default Anime;
