;; Alien Species NFT Contract

(define-non-fungible-token alien-species uint)

(define-data-var last-token-id uint u0)

(define-map token-uris { token-id: uint } { uri: (string-utf8 256) })

(define-public (mint (recipient principal) (uri (string-utf8 256)))
  (let
    (
      (token-id (+ (var-get last-token-id) u1))
    )
    (try! (nft-mint? alien-species token-id recipient))
    (map-set token-uris { token-id: token-id } { uri: uri })
    (var-set last-token-id token-id)
    (ok token-id)
  )
)

(define-public (transfer (token-id uint) (sender principal) (recipient principal))
  (nft-transfer? alien-species token-id sender recipient)
)

(define-read-only (get-owner (token-id uint))
  (ok (nft-get-owner? alien-species token-id))
)

(define-read-only (get-token-uri (token-id uint))
  (ok (get uri (unwrap! (map-get? token-uris { token-id: token-id }) (err u404))))
)

