const MockCAS = {
    validate: (ticket, onValidate) => {
        if (ticket === "error") {
            onValidate("Test Error", null, null);
        } else {
            onValidate(null, 200, "jDoe");
        }
    }
}

export default MockCAS;