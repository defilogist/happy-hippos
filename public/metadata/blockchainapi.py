import os
import requests
import json
from theblockchainapi import TheBlockchainAPIResource, SolanaNetwork, SearchMethod

ID = "swBPxuPwTGXCtqi"
SECRET = "tM3amhyhsUyBiAA"
BLOCKCHAIN_API_RESOURCE = TheBlockchainAPIResource(
    api_key_id=ID,
    api_secret_key=SECRET
)
name_to_search = "Happy Hippo #"
nfts = BLOCKCHAIN_API_RESOURCE.search_nfts(
    nft_name=name_to_search,
    nft_name_search_method=SearchMethod.BEGINS_WITH,
    network=SolanaNetwork.MAINNET_BETA
)
for nft in nfts:
    name = nft["nft_metadata"]["data"]["name"][13:]
    if not os.path.exists(name + 'png'):
        try:
            picture_metadata_url = nft["nft_metadata"]["data"]["uri"]
            open(name + '-chain.json', 'w') \
              .write(json.dumps(nft["nft_metadata"]["data"]))
            r = requests.get(picture_metadata_url, allow_redirects=True)
            open(name + '-meta.json', 'wb').write(r.content)
            basic_data = r.json()
            picture_url = basic_data["properties"]["files"][0]["uri"]
            r = requests.get(picture_url, allow_redirects=True)
            open(name + '.png', 'wb').write(r.content)
        except:
            pass
