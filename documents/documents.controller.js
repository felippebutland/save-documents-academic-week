import Document from "./documents.model.js";

export async function sendDocument(req, res) {
    try {
        const doc = {
            userId: req.user,
            documentBase64: req.body.document,
        };

        const result = await Document.create(doc);
        console.log(`Document inserted with _id: ${result._id}`);

        return res.json({
            message: 'document inserted',
            id: result._id
        })
    }catch (e) {
        return res.status(500).json({
            message: 'error to insert document'
        })
    }

}

export async function deleteDocument(userId, documentId) {

    const doc = {
        userId: userId,
        document: documentId,
        uploadedAt: new Date()
    }

    const result = await Document.deleteOne(doc);

    return result.deletedCount
}

export async function listDocumentsByUser(req, res) {
    const doc = {
        userId: req.user,
    }

    const documents = await Document.find(doc);

    const mappedDocuments = documents.map((document) => {
        return {
            documentId: document._id
        }
    })

    return res.json({
        userId: req.user,
        userDocuments: mappedDocuments,
    })
}