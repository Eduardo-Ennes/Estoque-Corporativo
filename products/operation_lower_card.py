def Card(pk, card_param, price_param):
    card = card_param
    price = price_param
    print('CARRINHO')
    print()
    print('PK: ', pk)
    print()
    print('CARD: ', type(card))
    print()
    print('PRICE: ', price)
    print()
    
    for c in card:
        if c['id'] == pk:
            if c['promotion']:
                if c['quantity'] == 1:
                    newCard = list(filter(lambda product: product['id'] != pk, card))
                    price['price'] -= c['price_promotion']
                    return[newCard, price]
                else:
                    c['quantity'] -= 1
                    price['price'] -= c['price_promotion']
                    return[card, price]
            else:
                if c['quantity'] == 1:
                    newCard = list(filter(lambda product: product['id'] != pk, card))
                    price['price'] -= c['price']
                    return[newCard, price]
                else:
                    c['quantity'] -= 1
                    price['price'] -= c['price']
                    return[card, price]