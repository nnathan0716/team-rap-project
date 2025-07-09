category = ["Books", "Electronics", "Clothing", "Food", "Home Goods"]

from faker import Faker
from faker_commerce import Provider as CommerceProvider

fake = Faker()
fake.add_provider(CommerceProvider)

product_description = fake.product_description()
print(product_description)