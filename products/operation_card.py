def Card(pk, qtd, card_param, price_param, obj):
    card = card_param
    price = price_param
    object = [{
        'id': int(obj.data['id']),
        'name': obj.data['name'],
        'price': float(obj.data['price']),
        'promotion': bool(obj.data['promotion']),
        'price_promotion': float(obj.data['price_promotion']),
        'qtd': int(obj.data['stock_quantity'])
    }]
    if len(object) > 0:
        if object[0]['qtd'] <= 0:
            return{'error': f"Não há produto do(a) {object[0]['name']} em estoque."}
        else:
            InCard = list(filter(lambda product: product['id'] == object[0]['id'], card))
            if len(InCard) > 0:
                if object[0]['promotion']:
                    if qtd == 1:
                        for c in card:
                            if c['id'] == pk:
                                if c['quantity'] >= object[0]['qtd']:
                                    return{'error': f"Solicitação inválida. Você possui {c['quantity']} {object[0]['name']}s no carrinho, há apenas {object[0]['qtd']} em estoque."}
                                
                                c['quantity'] += 1
                                price['price'] += c['price_promotion']
                                return[card, price]
                                
                    else:
                        for c in card:
                            if c['id'] == pk:
                                if qtd >= object[0]['qtd']:
                                    return{'error': f"Solicitação inválida. Você não pode adicionar {pk} {object[0]['name']}s ao carrinho, por que há apenas {object[0]['qtd']} em estoque."}
                                    
                                lower_price = c['quantity'] * c['price_promotion']
                                price['price'] -= lower_price
                                c['quantity'] = qtd
                                raise_price = qtd * c['price_promotion']
                                price['price'] += raise_price 
                                return[card, price]
                else: 
                    if qtd == 1:
                        for c in card:
                            if c['id'] == pk:
                                if c['quantity'] >= object[0]['qtd']:
                                    return{'error': f"Solicitação inválida. Você possui {c['quantity']} {object[0]['name']}s no carrinho, há apenas {object[0]['qtd']} em estoque."}
                                    
                                c['quantity'] += 1
                                price['price'] += c['price']
                                return[card, price]
                    else:
                        for c in card:
                            if c['id'] == pk:
                                if qtd >= object[0]['qtd']:
                                    return{'error': f"Solicitação inválida. Você não pode adicionar {pk} {object[0]['name']}s ao carrinho, por que há apenas {object[0]['qtd']} em estoque."}
                                    
                                lower_price = c['quantity'] * c['price']
                                price['price'] -= lower_price
                                c['quantity'] = qtd
                                raise_price = qtd * c['price']
                                price['price'] += raise_price 
                                return[card, price]
            else:
                # Obejto não está no carrinho
                if object[0]['promotion']:
                    # Objeto com promoção
                    card.append({'id': object[0]['id'], 
                                'name': object[0]['name'], 
                                'price': object[0]['price'], 
                                'promotion': object[0]['promotion'], 
                                'price_promotion': object[0]['price_promotion'],
                                'quantity': 1
                                })
                    price['price'] += object[0]['price_promotion']
                    return[card, price]
                else:
                    # Objeto sem promoção
                    card.append({'id': object[0]['id'], 
                                'name': object[0]['name'], 
                                'price': object[0]['price'], 
                                'promotion': object[0]['promotion'], 
                                'price_promotion': object[0]['price_promotion'],
                                'quantity': 1
                                })
                    price['price'] += object[0]['price']
                    return[card, price]
    else:
        return{'error': "Produto não encontrado na base de dados!"}
