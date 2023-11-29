set1 = {1, 2, 3, 4, 5}
set2 = {3, 4}

is_subset = set2.issubset(set1)
is_superset = set1.issuperset(set2)

print("Is set2 a subset of set1?", is_subset)
print("Is set1 a superset of set2?", is_superset)
