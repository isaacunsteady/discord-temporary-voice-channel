# Discord Temporary Voice Channel

### Kurulum

1. Gerekli modülleri indirmek için; dosya üzerinden konsola erişim sağlayınız.    
   ```sh
   npm install
   ```
2. Çalıştırabilmek için `configurations.json` dosyanındaki boşlukları doldurunuz.
   ```JS
   {
    "imports": {
      "token": "BOT_TOKEN",
      "prefix": "SERVER_PREFIX"
    },
    "temporary": {
      "channel": "CREATE_ROOM_ID", 
      "category": "CREATE_CATEGORY_ID",
       "text": "USE_COMMANDS_CHANNEL_ID",
      "limit": 2 
     }
   }
   ```
