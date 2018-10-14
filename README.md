# FCC Exercise tracker

**Create a New User**

`POST /api/exercise/new-user`

**Add exercises**

`POST /api/exercise/add`

**GET users's exercise log:**

```
GET /api/exercise/log?{userId}[&from][&to][&limit]

{ } = required, [ ] = optional
from, to = dates (yyyy-mm-dd); limit = number
```
