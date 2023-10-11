import { FastifyReply, FastifyRequest } from "fastify";
import { randomUUID } from "node:crypto";
import { createWriteStream } from "node:fs";
import { pipeline } from "node:stream";
import { promisify } from "node:util";
import { extname, resolve } from "node:path";

const pump = promisify(pipeline)

export const UploadImageProductController = async (request: FastifyRequest, reply: FastifyReply) => {

  const upload = await request.file({
    limits: {
      fileSize: 5_242_880, // 5MB
    }
  })

  if (!upload) {
    return reply.status(400).send({ message: "Invalid file" })
  }

  const mimeTypeRegex = /^image\/(jpeg|png)$/
  const isValidMimeType = mimeTypeRegex.test(upload.mimetype)

  if (!isValidMimeType) {
    return reply.status(400).send({ message: "Invalid file type" })
  }

  const fileId = randomUUID()
  const extension = extname(upload.filename)
  const fileName = fileId.concat(extension)
  const writeStream = createWriteStream(
    resolve(__dirname, '../../../../../uploads', fileName)
  )

  await pump(upload.file, writeStream)   
  
  const fullUrl = request.protocol.concat("://").concat(request.hostname)
  const fileUrl = new URL(`/uploads/${fileName}`, fullUrl).toString()

  return reply.status(201).send(fileUrl)
}
