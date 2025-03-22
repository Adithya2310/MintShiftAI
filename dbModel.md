# NFT Database Schema

This schema defines the structure of a database for managing NFT collections, individual NFTs, and AI-generated tweets related to NFT mints.

## Tables Overview

### 1️⃣ Collections Table (`collections`)

The `collections` table stores details about NFT collections and Twitter credentials.

| Column Name         | Data Type       | Description                                           |
|---------------------|-----------------|-------------------------------------------------------|
| `collection_address` | TEXT            | Unique blockchain address of the collection.          |
| `name`               | TEXT (PK)       | Name of the NFT collection.                           |
| `description`        | TEXT            | Short description of the collection.                  |
| `owner_address`      | TEXT            | Wallet address of the collection owner.               |
| `collection_image`   | TEXT            | Collection Image URL link.                            |
| `twitter_handle`     | TEXT            | Twitter handle for posting tweets.                    |
| `api_key`            | TEXT (Encrypted)| Twitter API key.                                      |
| `api_secret`         | TEXT (Encrypted)| Twitter API secret.                                   |
| `access_token`       | TEXT (Encrypted)| Twitter access token.                                 |
| `access_secret`      | TEXT (Encrypted)| Twitter access token secret.                          |
| `created_at`         | TIMESTAMP       | Timestamp when the collection was created.            |

### 2️⃣ NFTs Table (`nfts`)

The `nfts` table stores individual NFT metadata and listing status.

| Column Name         | Data Type       | Description                                           |
|---------------------|-----------------|-------------------------------------------------------|
| `nft_address`        | TEXT (PK)       | Unique blockchain address of the NFT.                 |
| `collection_name`    | TEXT (FK)       | References `collections.name`.                        |
| `price`              | INT             | References `collections.name`.                        |
| `name`               | TEXT            | Name of the NFT.                                      |
| `description`        | TEXT            | Description of the NFT.                               |
| `image_url`          | TEXT            | URL of the AI-generated NFT image.                    |
| `isListed`           | BOOLEAN         | Indicates whether the NFT is listed for sale.         |
| `minted_at`          | TIMESTAMP       | Timestamp when the NFT was minted.                    |
| `owner_address`      | TEXT            | Wallet address of the NFT owner.                      |

### 3️⃣ AI Processing Table (`ai_tweets`) (Optional)

The `ai_tweets` table stores AI-generated tweets for NFT mints.

| Column Name         | Data Type       | Description                                           |
|---------------------|-----------------|-------------------------------------------------------|
| `id`                | UUID (PK)       | Unique identifier.                                    |
| `nft_address`       | TEXT (FK)       | References `nfts.nft_address`.                        |
| `tweet_text`        | TEXT            | AI-generated tweet content.                           |
| `status`            | TEXT            | Status of the tweet (pending, posted, failed).        |
| `posted_at`         | TIMESTAMP       | Timestamp when the tweet was posted.                  |

## Relationships

- The `nfts` table has a foreign key relationship to the `collections` table via the `collection_address` column.
- The `ai_tweets` table has a foreign key relationship to the `nfts` table via the `nft_address` column.
