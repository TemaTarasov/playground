import { set, get, omit, isNil } from 'lodash';

interface Options {
  lodash?: boolean;
  defaultData?: any;
}

interface IStorage {
  get(key: string, options?: Options): any;
  remove(key: string, options?: Options): any;
  set(key: string, data: any, options?: Options): any;
}

/**
 * @param {string | Array} key
 * @returns {Array<string>}
 */
function getPath(key: string | string[]): string[] {
  return typeof key === 'string' ? key.split('.') : key;
}

/**
 * @param {Function} callback
 * @returns void
 */
function handleError(callback: Function): void {
  try {
    callback();
  } catch (e) {}
}

const Storage: IStorage = {
  /**
   * @param  {string} key
   * @param  {object} [Options]
   * @return {any}
   */
  get(key: string, options: Options = {}): any {
    const { lodash, defaultData } = options;
    let result = defaultData;

    handleError(() => {
      if (lodash) {
        const [parent, ...path] = getPath(key);
        const data = this.get(parent, defaultData);

        result = get(data, path, defaultData);
      } else {
        result = localStorage.getItem(key) || defaultData;
        result = JSON.parse(result) || defaultData;
      }
    });

    return result;
  },

  /**
   * @param  {string} key
   * @param  {object} [Options]
   * @return void 0
   */
  remove(key: string, options: Options = {}): any {
    const { lodash } = options;

    handleError(() => {
      if (lodash) {
        const [parent, ...path] = getPath(key);
        const result = this.get(parent);

        this.set(parent, omit(result, path));
      } else {
        localStorage.removeItem(key);
      }
    });
  },

  /**
   * @param  {string} key
   * @param  {any} data
   * @param  {object} [Options]
   * @return {any}
   */
  set(key: string, data: any, options: Options = {}): any {
    const { lodash, defaultData = {} } = options;

    if (isNil(data)) {
      return data;
    }

    handleError(() => {
      if (lodash) {
        const [parent, ...path] = getPath(key);
        const result = this.get(parent, { defaultData });

        this.set(parent, set(result, path, data));
      } else {
        localStorage.setItem(key, JSON.stringify(data));
      }
    });

    return data;
  }
};

export default Storage;
