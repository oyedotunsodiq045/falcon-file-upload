# FALCON-FILE-UPLOAD

> a crud dockerized microservice for files #multer #cloudinary #multer-storage-cloudinary.

## Quick Start

```bash
# Install dependencies
npm i

# Install dev-dependencies
npm i -D nodemon

# Install optional dependencies (works with Windows only)
npm i --save-optional win-node-env

# Serve on localhost:3000 (development)
npm run dev

# Serve on localhost:3000 (production)
npm start
```

### Testing

### Files

#### Create a File

* Method - POST

* URL - localhost:3000/api/v1/files

* Sample Request

![Task screenshot](create_a_file.png)

* Sample Response

```
{
    "success": true,
    "data": {
        "_id": "5ee23b1204f6545adc9eb9a7",
        "path": "https://res.cloudinary.com/major-stark/image/upload/v1591884570/files/eqfr3lfmch4ubrn9wfws.jpg",
        "date": "2020-06-11T14:09:22.867Z"
    }
}
```

#### Create bulk Files

* Method - POST

* URL - localhost:3000/api/v1/files/bulk

* Sample Request

![Task screenshot](create_bulk_files.png)

* Sample Response

```
...
```

#### Get all Files

* Method - GET

* URL - localhost:3000/api/v1/files

* Sample Response

```
{
    "success": true,
    "count": 3,
    "data": [
        {
            "_id": "5ee23577a32c8b623c7a85f2",
            "path": "https://res.cloudinary.com/major-stark/image/upload/v1591883134/files/pfwrpm0aaxhkmjxhhecx.jpg",
            "date": "2020-06-11T13:45:27.193Z",
            "__v": 0
        },
        {
            "_id": "5ee235a6a32c8b623c7a85f3",
            "path": "https://res.cloudinary.com/major-stark/image/upload/v1591883181/files/mxhwueg0pmbq1bcq6gzo.png",
            "date": "2020-06-11T13:46:14.299Z",
            "__v": 0
        },
        {
            "_id": "5ee23b1204f6545adc9eb9a7",
            "path": "https://res.cloudinary.com/major-stark/image/upload/v1591884570/files/eqfr3lfmch4ubrn9wfws.jpg",
            "date": "2020-06-11T14:09:22.867Z",
            "__v": 0
        }
    ]
}
```

#### Get a File

* Method - GET

* URL - localhost:3000/api/v1/files/5ee23577a32c8b623c7a85f2

* Sample Response

```
{
    "success": true,
    "data": {
        "_id": "5ee23577a32c8b623c7a85f2",
        "path": "https://res.cloudinary.com/major-stark/image/upload/v1591883134/files/pfwrpm0aaxhkmjxhhecx.jpg",
        "date": "2020-06-11T13:45:27.193Z",
        "__v": 0
    }
}
```

#### Update a File

* Method - PUT

* URL - localhost:3000/api/v1/files/:id

* HEADER

* Sample Request

```
...
```

* Sample Response

```
...
```

#### Delete a File

* Method - DELETE

* URL - localhost:3000/api/v1/files/:id

* HEADER

* Sample Request

```
...
```

* Sample Response

```
...
```

#### Search a File

#### Get all Files - Paging
