import qs from 'query-string';

interface IQueryString {
  parse(query?: string): any;
  stringify(data: any): string;
}

const format: any = { arrayFormat: 'comma' };

const QueryString: IQueryString = {
  parse(query = window.location.search) {
    return qs.parse(query, format) || {};
  },
  stringify(data) {
    return `?${qs.stringify(data, format)}`;
  }
};

export default QueryString;
