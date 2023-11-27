# Sorting a list in ascending order
my_list = [5, 2, 8, 1, 6]
sorted_list = sorted(my_list)
print("Sorted List (Ascending):", sorted_list)

# Sorting a list in descending order
reverse_sorted_list = sorted(my_list, reverse=True)
print("Sorted List (Descending):", reverse_sorted_list)

# Sorting the original list in-place
my_list.sort()
print("Original List Sorted (Ascending):", my_list)
