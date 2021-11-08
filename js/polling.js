// import _noop from 'lodash/noop';
const _noop = () => {};

/**
 * @template T
 * @typedef {object} IExtraParams
 * @prop {(data: T) => boolean} isLoadingState 判断当前返回的数据是不是 loading 态, **loading 态 意味着继续轮询**
 * @prop {(data: T) => boolean} isSuccessState 判断当前返回的数据是不是 成功态, **成功态 意味着不再继续轮询**
 * @prop {(data: T) => boolean} isFailedState 判断当前返回的数据是不是 失败态, **失败态 意味着不再继续轮询**
 * @prop {number} [interval=1000] 轮询间隔, 默认为 1000ms(也就是 1s)
 * @prop {(data: T) => void} [onLoading] 判断数据为 loading 态 时的回调函数
 * @prop {(data: T) => void} [onSuccess] 判断数据为 成功态 时的回调函数
 * @prop {(data: T) => void} [onFailed] 判断数据为 失败态 时的回调函数
 * @prop {(data: T) => void} [onReqError] 当请求失败时的回调函数, **请求失败意味着不再继续轮询**
 */

/**
 * @desc
 * ## 轮询一个异步操作
 * 
 * 类分为四种状态
 * 
 * 1. **loading 态** 异步操作正在处理中, 还未处理完毕
 * 2. **成功态** 异步操作成功, 处理完毕
 * 3. **失败态** 异步操作失败, 处理完毕
 * 4. **错误态** 异步请求失败, 这里的请求失败不一定是网络错误, 对于 action 异步方法 **抛出的 error** 或者 **reject** 都会被捕获, 然后进入该状态
 * 
 * 从 loading 态 -> 成功态, 失败态, 错误态 都会停止轮询操作
 * 从 loading 态 -> loading 态, 会继续轮询
 * 
 * ### Example
 * 
 * 1. 用户订阅微信公众号的消息需要首先关注微信公众号, 当用户未关注公众号的时候, 弹出二维码提示用户关注公众号, 然后后台轮询用户是否已经完成关注公众号操作
 * 1.1 用户可能不关注公众号, 直接关闭二维码, 这时候需要中断轮询
 * 
 * ```js
 * const polling = new Polling((data) => fetch('/api/example', data), { foo: 2 }, {
 *   isLoadingState(data) {
 *      if () {
 *        return true;
 *      }
 *   },
 *   isSuccessState(data) {
 *      if () {
 *        return true;
 *      }
 *   },
 *   isFailedState(data) {
 *      if () {
 *        return true;
 *      }
 *   },
 *   onSuccess(data) {
 *    // 异步操作成功, 提示用户应该下一步怎么做, 或者取消禁用某些按钮
 *   }
 * })
 * ```
 * 
 * @template ActionResType, ParamsType
 */
export class Polling {
  /**
   * 创建一个轮询, 但是不会自动执行
   * @param {Promise<ActionResType>} action 一个异步操作, 可以是一个 api 的请求, Promise 类型, 会在 then 方法里面做后续处理
   * @param {ParamsType} params 需要传递给异步操作的数据, 注意, 目前这里只支持一个参数, 调用方式 -> `action(params)`, 无论 params 是否存在都会传递, 并且该参数没有默认值
   * @param {IExtraParams<ActionResType>} param2 额外的参数, 用对象的原因是为了增强可扩展性
   */
  constructor(
    action,
    params,
    {
      isLoadingState,
      isSuccessState,
      isFailedState,
      interval = 1000,
      onLoading = _noop,
      onSuccess = _noop,
      onFailed = _noop,
      onReqError = _noop,
    },
  ) {
    /** private property */
    this.action = action;
    this.params = params;
    this.interval = interval;
    this.isLoadingState = isLoadingState;
    this.isSuccessState = isSuccessState;
    this.isFailedState = isFailedState;
    this.onLoading = onLoading;
    this.onSuccess = onSuccess;
    this.onFailed = onFailed;
    this.onReqError = onReqError;

    this._lastCallTimestamp = 0;
    this._isAbort = false;
    this._polling = false;
    /** END private property */
  }

  _poll() {
    if (this._isAbort) {
      return;
    }
    this._lastCallTimestamp = +new Date();
    this.action(this.params)
      .then(data => {
        if (this.isLoadingState(data)) {
          // loading 中
          this.onLoading(data);
          setTimeout(() => this._poll(), this.interval);
          return;
        }
        this.abort();
        if (this.isSuccessState(data)) {
          this.onSuccess(data);
        }
        if (this.isFailedState(data)) {
          // 调用外部 failed
          this.onFailed(data);
        }
      })
      .catch(e => {
        this.abort();
        this.onReqError(e);
      });
  }

  /**
   * 开始运行
   * @returns
   */
  run() {
    if (this._polling) {
      return;
    }
    this._polling = true;
    this._poll();
  }

  /**
   * 手动停止
   */
  abort() {
    this._isAbort = true;
  }
}
