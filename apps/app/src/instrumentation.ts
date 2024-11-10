// export async function register() {
//   if (process.env.NEXT_RUNTIME === "nodejs") {
//     await import("../sentry.server.config");
//   }

//   if (process.env.NEXT_RUNTIME === "edge") {
//     await import("../sentry.edge.config");
//   }
// }

export async function register() {
  if (process.env.NEXT_RUNTIME === "edge") {
    await import("../sentry.edge.config");
  } else {
    await import("../sentry.server.config");
  }
}

export async function onRequestError() {
  if (process.env.NEXT_RUNTIME === "edge") {
    await import("../sentry.edge.config");
  } else {
    await import("../sentry.server.config");
  }
}
