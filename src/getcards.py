"""This module grabs the latest gwent card data from the Gwent API"""

import json
import shutil
import requests

def main():
    """Main method"""
    card_json = []
    request = requests.get('https://api.gwentapi.com/v0/cards')
    card_count = request.json()['count']
    all_cards = requests.get('https://api.gwentapi.com/v0/cards/?limit=' +
                             str(card_count))
    cards = all_cards.json()
    for card in cards['results']:
        next_card = {'name': card['name']}
        card_request = requests.get(card['href'])
        card_info = card_request.json()
        if 'categories' in card_info:
            next_card['category'] = card_info['categories'][0]['name']
        next_card['faction'] = card_info['faction']['name']
        if 'flavor' in card_info:
            next_card['flavor'] = card_info['flavor']
        if 'group' in card_info:
            next_card['group'] = card_info['group']['name']
        if 'text' in card_info:
            next_card['text'] = card_info['info']
        if 'positions' in card_info:
            next_card['positions'] = card_info['positions']
        next_card['set'] = card_info['variations'][0]['availability']
        next_card['rarity'] = card_info['variations'][0]['rarity']['name']
        art_request = requests.get(card_info['variations'][0]['href']).json()
        get_art_response = requests.get(art_request['art']['thumbnailImage'],
                                        stream=True)
        with open('images/' + next_card['name'] + '.png', 'wb') as out_file:
            get_art_response.raw.decode_content = True
            shutil.copyfileobj(get_art_response.raw, out_file)
        del get_art_response
        next_card['art'] = 'images/' + next_card['name'] + '.png'
        card_json.append(next_card)
        print(next_card['name'])
    print(card_json)
    json_data = json.dumps(card_json)
    text_file = open('card_json.json', 'w')
    text_file.write(json_data)
    text_file.close()

if __name__ == '__main__':
    main()
