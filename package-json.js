{
    "private": true,
        "dependencies": {
        "json-server": "^0.16.3",
            "live-server": "^1.2.1",
                "npm-run-all": "^4.1.5"
    },
    "scripts": {
        "start": "run-p api web",
            "api": "json-server db.json",
                "web": "live-server --ignore=./db.json ./"
    }
}