export const FETCH_SERVICE_ID = "@flowscripter/dynamic-cli-framework/fetch-service";

/**
 * Options for {@link FetchService.fetch}. Extends the standard `RequestInit` so any request
 * method, headers, body, or credentials supported by native `fetch()` can be used.
 */
export interface FetchOptions extends RequestInit {
  /**
   * If specified, the fetch is aborted if it has not settled within this many milliseconds.
   * Defaults to unbounded.
   */
  timeoutMs?: number;

  /**
   * Whether to enter long-running shutdown mode for the duration of the fetch, so a single Ctrl-C
   * gracefully aborts the request rather than immediately exiting the CLI. Defaults to `false`.
   */
  longRunning?: boolean;
}

/**
 * Service allowing a {@link Command} to perform a `fetch()` request, with an optional timeout and
 * shutdown signals gracefully aborting the request.
 */
export default interface FetchService {
  /**
   * Perform a fetch request.
   *
   * @param input the URL to fetch.
   * @param options optional {@link FetchOptions}.
   *
   * @return the `Response`. Rejects the same way native `fetch()` does: a genuine network failure
   * rejects with a `TypeError`, a timeout (via {@link FetchOptions.timeoutMs}) rejects with a
   * `DOMException` whose `name` is `"TimeoutError"`, and a shutdown-triggered abort rejects with a
   * `DOMException` whose `name` is `"AbortError"`.
   */
  fetch(input: string | URL, options?: FetchOptions): Promise<Response>;
}
