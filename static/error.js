export function err(error) {
    if (error instanceof Error) {
        return { success: false, error };
    }

    if (typeof error === "string") {
        return { success: false, error: new Error(error) };
    }

    try {
        const stringified = JSON.stringify(error);
        return { success: false, error: new Error(stringified) };
    } catch {
        // if we make it here, someone has thrown a really useless error
        // so we’re forced to have a generic error message
        return { success: false, error: new Error("An error occurred") };
    }
}

export function ok(error) {
    return { success: true, error }
}