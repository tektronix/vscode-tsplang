given a document lookup table in the server

incoming document open
router can't resolve URI from lookup table
document factory creates a new DocumentModel and stores it in some lookup table
    DocModel constructor is given the URI
        added to URI events we care about
    DocModel subscribes to Raelyn events
router sends new text to DocModel w/ URI
    DocModel sends updated text to Raelyn for crunching
        (resulting Raelyn events are handled by subscribed objects in the event-loop)
