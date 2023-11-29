def outer_function():
    outer_variable = "I am outer"

    def inner_function():
        print(outer_variable)

    inner_function()


outer_function()
