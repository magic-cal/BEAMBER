import store from "@/store"
import { getModule, Module, Mutation, VuexModule } from "vuex-module-decorators"

@Module({ dynamic: true, store, name: "app" })
export class AppModule extends VuexModule {
  public version = "1"
  public loading = false
  public error: string | Error | null = null
  private entryCount = 0

  @Mutation
  public setLoading(loading: boolean): void {
    this.entryCount = this.entryCount + (loading ? 1 : -1)
    this.loading = this.entryCount > 0
  }

  @Mutation
  public setError(error: string | Error | null): void {
    // Logging to the console allows Chrome to do it's thang with sourcemaps
    // eslint-disable-next-line no-console
    if (error && window.console && console.error) {
      console.error(error) // eslint-disable-line no-console
    }

    this.error = error
  }
}

const appStore = getModule(AppModule)

// Decorator for Telling AppStore to show loader
export function WithLoading<T extends Record<string, any>, R>(
  target: T,
  key: string | symbol,
  descriptor: TypedPropertyDescriptor<(...args: any[]) => R>
): void {
  const fn = descriptor.value as Function
  descriptor.value = function(this: any, ...args) {
    let wasPromise = false
    try {
      appStore.setLoading(true)
      const result = fn.apply(this, args)
      if (result instanceof Promise) {
        wasPromise = true
        result.finally(() => {
          appStore.setLoading(false)
        })
      }
      return result
    } finally {
      if (!wasPromise) {
        appStore.setLoading(false)
      }
    }
  }
}
export default appStore
