import slugify from 'slugify';

const slugifyString = (string: string) => slugify(string).toLowerCase();
export default slugifyString;
