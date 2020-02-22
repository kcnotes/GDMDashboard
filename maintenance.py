import json

wikis = ['13reasonswhy.fandom.com/fr'] # Insert list of wikis to delete

with open('data/wikiinfo.json', 'r') as jsonFile:
    data = json.load(jsonFile)
    for wiki in wikis:
        if wiki in data['items']:
            data['items'].pop(wiki)
            print('Removed url: ' + wiki)


if data:
    with open('data/wikiinfo.json', 'w') as jsonFile:
        jsonFile.write(json.dumps(data, indent=4, sort_keys=True))
