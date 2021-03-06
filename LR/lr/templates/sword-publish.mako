<?xml version="1.0"?>

   <entry xmlns="http://www.w3.org/2005/Atom"
	 xmlns:sword="http://purl.org/net/sword/">
     <title>${c.doc["doc_ID"] | x}</title>
     <id>${c.doc["doc_ID"] | x}</id>
     % if c.no_op:
         <sword:noOp>true</sword:noOp>
     % endif
     % if c.verbose:
         <sword:verboseDescription>
            Does collection exist? True.
            User authenticates? True.
            User: ${c.on_behalf_of}
            User has rights to collection? True. 
         </sword:verboseDescription>
     % endif
     <updated>${c.doc['update_timestamp']}</updated>

     <author><name>${c.doc['identity']['submitter']}</name></author>
     <summary type="text">A summary</summary>
     <sword:userAgent>${c.user_agent}</sword:userAgent>
     <content type="application/json" src="${c.content_url | n}"/>	
  </entry>
