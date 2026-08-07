// ======================================
// Success Alert
// ======================================

function showSuccess(message) {

    Swal.fire({

        icon: "success",

        title: "Success",

        text: message,

        confirmButtonColor: "#2563eb"

    });

}

// ======================================
// Error Alert
// ======================================

function showError(message) {

    Swal.fire({

        icon: "error",

        title: "Error",

        text: message,

        confirmButtonColor: "#dc2626"

    });

}

// ======================================
// Warning Alert
// ======================================

function showWarning(message) {

    Swal.fire({

        icon: "warning",

        title: "Warning",

        text: message,

        confirmButtonColor: "#f59e0b"

    });

}

// ======================================
// Confirm Alert
// ======================================

async function showConfirm(message) {

    const result = await Swal.fire({

        icon: "question",

        title: "Confirm",

        text: message,

        showCancelButton: true,

        confirmButtonColor: "#2563eb",

        cancelButtonColor: "#dc2626",

        confirmButtonText: "Yes",

        cancelButtonText: "No"

    });

    return result.isConfirmed;

}