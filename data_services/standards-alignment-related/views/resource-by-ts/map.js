function(doc) {

    // !code lib/alignment.js

    try {
        if (doc.doc_type == "resource_data" && doc.resource_data && doc.resource_locator && doc.node_timestamp) {
            var nodeTimestamp = convertDateToSeconds(doc);
            try {
                var seen = false;
                var parser = function (conformsToText) { 
                    if (seen) return;
                    
                    for (re in ASNPatterns){
                        var stds = conformsToText.match(ASNPatterns[re]);
                        for (s in stds) {
                            if (!seen) {
                                emit([nodeTimestamp, doc.resource_locator], null);
                                seen = true;
                                break;
                            }
                        }
                        if (seen) break;
                    }
                };

                Alignment.parseDCT_ConformsTo(doc.resource_data, parser);
            } catch (e) {}

            try {
            if (typeof doc.resource_data == 'object') {
                var LRMIPackage = doc.resource_data; 
                for (idz in LRMIPackage.educationalAlignment) {
                    if (LRMIPackage.educationalAlignment[idz].targetUrl != null && typeof LRMIPackage.educationalAlignment[idz].targetUrl == 'object') {
                        for (idy in LRMIPackage.educationalAlignment[idz].targetUrl) {
                                emit([nodeTimestamp, doc.resource_locator],null);
                        }
                    } else if (LRMIPackage.educationalAlignment[idz].targetUrl != null && typeof LRMIPackage.educationalAlignment[idz].targetUrl == 'string') {
                        emit([nodeTimestamp, doc.resource_locator],null);
                    }
                }
            }

            if (typeof doc.resource_data == 'string'){
                var LRMIPackage = JSON.parse(doc.resource_data); 
                for (idz in LRMIPackage.educationalAlignment) {
                    if (LRMIPackage.educationalAlignment[idz].targetUrl != null && typeof LRMIPackage.educationalAlignment[idz].targetUrl == 'string') {
                            emit([nodeTimestamp, doc.resource_locator],null);
                        } else if (LRMIPackage.educationalAlignment[idz].targetUrl != null && typeof LRMIPackage.educationalAlignment[idz].targetUrl == 'object') {
                            for (idy in LRMIPackage.educationalAlignment[idz].targetUrl) {
                                emit([nodeTimestamp, doc.resource_locator],null);
                        }
                    }
                }
            }
            } catch (e) {}
            
            try {
                var seen = {};
                var parser = function (objStr, verb) {
                    for (re in ASNPatterns){
                        var stds = objStr.match(ASNPatterns[re]);
                        for (s in stds) {
                            if (!seen[s]) {
                                emit([nodeTimestamp, doc.resource_locator], null);
                                seen[s] = 1;
                            }
                        }
                    }
                };

                Alignment.parseLRParadata(doc.resource_data, parser);
            } catch (e) {}
        }   
    
    } catch (error) {
            log("error:"+error);
    }
}