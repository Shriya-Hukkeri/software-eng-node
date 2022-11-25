/**
 * @property {number} replies number of replies for a tuit
 * @property {number} retuits number of times  tuit is retuited
 * @property {number} likes number of likes a tuit has received
 * @property {number} dislikes number of dislikes a tuit has received
 */
export default interface Stats {
    replies?: number,
    retuits: number,
    likes: number,
    dislikes: number
};